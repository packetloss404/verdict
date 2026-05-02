"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { runGauntlet, runFollowUp, runMemo } from "@/utils/aiCalls";
import { Navigation } from "@/components/Navigation/Navigation";
import { Footer } from "@/components/Footer/Footer";
import { HeroSection } from "@/components/Hero/HeroSection";
import { IdeaInputForm } from "@/components/IdeaInput/IdeaInputForm";
import { GauntletLoadingState } from "@/components/Loading/GauntletLoadingState";
import { FollowUpLoadingState } from "@/components/Loading/FollowUpLoadingState";
import { MemoLoadingState } from "@/components/Loading/MemoLoadingState";
import { ErrorDisplay } from "@/components/Error/ErrorDisplay";
import { GauntletResults } from "@/components/Results/GauntletResults";
import { GoDeeperButton } from "@/components/Actions/GoDeeperButton";
import { WriteMemoButton } from "@/components/Actions/WriteMemoButton";
import { FollowUpSection } from "@/components/FollowUp/FollowUpSection";
import { MemoCard } from "@/components/Memo/MemoCard";
import { ReportCard } from "@/components/Report/ReportCard";
import { ViewReportButton } from "@/components/Actions/ViewReportButton";
import { HistoryTab } from "@/components/History/HistoryTab";
import { ChevronsDown, FileText, Terminal } from "lucide-react";

export default function GauntletPage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("new");
  const [idea, setIdea] = useState("");
  const [showReport, setShowReport] = useState(false);

  const { data: history = [], isLoading: historyLoading } = useQuery({
    queryKey: ["evaluations"],
    queryFn: async () => {
      const res = await fetch("/api/evaluate");
      if (!res.ok) throw new Error("Failed to fetch history");
      return res.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async (newIdea) => {
      // Step 1: AI call from the browser (no project ID issue)
      const gauntlet = await runGauntlet(newIdea);
      // Step 2: Save to DB
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: newIdea, gauntlet }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save evaluation");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["evaluations"]);
      setIdea("");
    },
  });

  const followupMutation = useMutation({
    mutationFn: async ({ evaluationId, rawIdea, gauntlet }) => {
      // Step 1: AI call from the browser
      const followup = await runFollowUp(rawIdea, gauntlet);
      // Step 2: Save to DB
      const res = await fetch("/api/followup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ evaluationId, followup }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save follow-up");
      }
      return res.json();
    },
  });

  const memoMutation = useMutation({
    mutationFn: async ({ evaluationId, followup, gauntlet, idea }) => {
      // Step 1: AI call from the browser
      const memo = await runMemo(idea, gauntlet, followup);
      // Step 2: Save to DB
      const res = await fetch("/api/memo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ evaluationId, memo }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save memo");
      }
      return res.json();
    },
  });

  const currentResult = mutation.data;
  const gauntlet =
    currentResult?.gauntlet ||
    (currentResult?.gauntlet_result
      ? typeof currentResult.gauntlet_result === "string"
        ? JSON.parse(currentResult.gauntlet_result)
        : currentResult.gauntlet_result
      : null);

  const showFollowUpBtn =
    currentResult &&
    gauntlet &&
    !mutation.isPending &&
    !followupMutation.isPending &&
    !followupMutation.data;

  const handleGoDeeper = () => {
    followupMutation.mutate({
      evaluationId: currentResult.id,
      rawIdea: currentResult.idea_text,
      gauntlet,
    });
  };

  const showMemoBtn =
    followupMutation.data &&
    !followupMutation.isPending &&
    !memoMutation.isPending &&
    !memoMutation.data;

  const handleReset = () => {
    mutation.reset();
    followupMutation.reset();
    memoMutation.reset();
    setShowReport(false);
    setIdea("");
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#FAFAF8",
        color: "#1C2030",
        fontFamily: "'Inter','Helvetica Neue',sans-serif",
      }}
    >
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-3xl mx-auto px-6 pb-28">
        {activeTab === "new" ? (
          <div>
            {/* Vertically centered landing — hero + input */}
            {!currentResult && !mutation.isPending && (
              <div
                style={{
                  minHeight: "calc(100vh - 120px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: 40,
                  paddingBottom: 60,
                }}
              >
                <HeroSection />
                <IdeaInputForm
                  idea={idea}
                  setIdea={setIdea}
                  onSubmit={() => mutation.mutate(idea)}
                  isSubmitting={mutation.isPending}
                />
              </div>
            )}

            {/* Loading — Gauntlet */}
            {mutation.isPending && (
              <div style={{ paddingTop: 60 }}>
                <GauntletLoadingState />
              </div>
            )}

            {/* Error */}
            {mutation.isError && (
              <div style={{ paddingTop: 40 }}>
                <ErrorDisplay
                  title="Evaluation failed"
                  message={mutation.error?.message}
                  onRetry={() => mutation.reset()}
                />
              </div>
            )}

            {/* Gauntlet Results */}
            {currentResult && gauntlet && !mutation.isPending && (
              <div className="space-y-6" style={{ paddingTop: 40 }}>
                <GauntletResults
                  gauntlet={gauntlet}
                  ideaText={currentResult.idea_text}
                  onReset={handleReset}
                />

                {showFollowUpBtn && <GoDeeperButton onClick={handleGoDeeper} />}
                {followupMutation.isPending && <FollowUpLoadingState />}
                {followupMutation.isError && (
                  <ErrorDisplay
                    title="Deep analysis failed"
                    message={followupMutation.error?.message}
                    onRetry={() => followupMutation.reset()}
                  />
                )}

                {followupMutation.data && !followupMutation.isPending && (
                  <>
                    <div className="flex items-center gap-4">
                      <div
                        className="flex-1 h-px"
                        style={{ background: "#D8CDB8" }}
                      />
                      <div className="flex items-center gap-2">
                        <ChevronsDown
                          className="w-3.5 h-3.5"
                          style={{ color: "#7C1A2A" }}
                        />
                        <span
                          className="text-[9px] font-bold tracking-[0.28em] whitespace-nowrap"
                          style={{
                            color: "#7C1A2A",
                            fontFamily: "'ui-monospace',monospace",
                          }}
                        >
                          PASS 2 · NO MERCY
                        </span>
                        <ChevronsDown
                          className="w-3.5 h-3.5"
                          style={{ color: "#7C1A2A" }}
                        />
                      </div>
                      <div
                        className="flex-1 h-px"
                        style={{ background: "#D8CDB8" }}
                      />
                    </div>
                    <FollowUpSection data={followupMutation.data} />

                    {showMemoBtn && (
                      <WriteMemoButton
                        onClick={() =>
                          memoMutation.mutate({
                            evaluationId: currentResult.id,
                            followup: followupMutation.data,
                            gauntlet,
                            idea: currentResult.idea_text,
                          })
                        }
                      />
                    )}
                    {memoMutation.isPending && <MemoLoadingState />}
                    {memoMutation.isError && (
                      <ErrorDisplay
                        title="Memo generation failed"
                        message={memoMutation.error?.message}
                        onRetry={() => memoMutation.reset()}
                      />
                    )}

                    {memoMutation.data && !memoMutation.isPending && (
                      <>
                        <div className="flex items-center gap-4">
                          <div
                            className="flex-1 h-px"
                            style={{ background: "#D8CDB8" }}
                          />
                          <div className="flex items-center gap-2">
                            <FileText
                              className="w-3.5 h-3.5"
                              style={{ color: "#7A5100" }}
                            />
                            <span
                              className="text-[9px] font-bold tracking-[0.28em] whitespace-nowrap"
                              style={{
                                color: "#7A5100",
                                fontFamily: "'ui-monospace',monospace",
                              }}
                            >
                              PASS 3 · FINAL CALL
                            </span>
                            <FileText
                              className="w-3.5 h-3.5"
                              style={{ color: "#7A5100" }}
                            />
                          </div>
                          <div
                            className="flex-1 h-px"
                            style={{ background: "#D8CDB8" }}
                          />
                        </div>
                        <MemoCard data={memoMutation.data} />

                        {!showReport && (
                          <ViewReportButton
                            onClick={() => setShowReport(true)}
                          />
                        )}

                        {showReport && (
                          <>
                            <div className="flex items-center gap-4">
                              <div
                                className="flex-1 h-px"
                                style={{ background: "#D8CDB8" }}
                              />
                              <div className="flex items-center gap-2">
                                <Terminal
                                  className="w-3.5 h-3.5"
                                  style={{ color: "#1C2B4A" }}
                                />
                                <span
                                  className="text-[9px] font-bold tracking-[0.28em] whitespace-nowrap"
                                  style={{
                                    color: "#1C2B4A",
                                    fontFamily: "'ui-monospace',monospace",
                                  }}
                                >
                                  PASS 4 · FINAL DIRECTIVE
                                </span>
                                <Terminal
                                  className="w-3.5 h-3.5"
                                  style={{ color: "#1C2B4A" }}
                                />
                              </div>
                              <div
                                className="flex-1 h-px"
                                style={{ background: "#D8CDB8" }}
                              />
                            </div>
                            <ReportCard
                              memo={memoMutation.data}
                              gauntlet={gauntlet}
                              followup={followupMutation.data}
                              idea={currentResult.idea_text}
                            />
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        ) : (
          <div style={{ paddingTop: 40 }}>
            <HistoryTab
              history={history}
              isLoading={historyLoading}
              onNewEvaluation={() => setActiveTab("new")}
            />
          </div>
        )}
      </main>

      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />

      <style jsx global>{`
        * { box-sizing: border-box; }

        .verdict-textarea::placeholder {
          color: #C4B8A0;
          font-family: Georgia, 'Times New Roman', serif;
          font-style: italic;
        }

        .verdict-submit-btn:hover:not(:disabled) {
          background: #1C2B4A !important;
          box-shadow: 0 4px 20px #0F182830 !important;
        }

        @keyframes gauntletSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes gauntletFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -800px 0; }
          100% { background-position:  800px 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.45; }
        }
        @keyframes followupSlide {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes memoReveal {
          from { opacity: 0; transform: translateY(32px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes reportReveal {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .gauntlet-spin    { animation: gauntletSpin 0.75s linear infinite; }
        .gauntlet-results { animation: gauntletFadeUp 0.5s ease-out forwards; }
        .followup-results { animation: followupSlide 0.6s ease-out forwards; }
        .memo-card        { animation: memoReveal 0.7s cubic-bezier(0.16,1,0.3,1) forwards; }
        .report-card      { animation: reportReveal 0.6s cubic-bezier(0.16,1,0.3,1) forwards; }
        .shimmer {
          background: linear-gradient(to right, #F2EDE6 8%, #E8E0D5 18%, #F2EDE6 33%);
          background-size: 800px 100%;
          animation: shimmer 1.5s infinite linear;
        }
        .pulse-item { animation: pulse 1.8s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
