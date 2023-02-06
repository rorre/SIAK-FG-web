import { createResource, Suspense, useContext } from "solid-js";
import AcademicSummary from "~/components/AcademicSummary";
import { AuthContext } from "~/components/AuthContext";
import { Score, ServerResponse, SummaryData } from "~/types";

export default function Academic() {
  const { wrappedFetch } = useContext(AuthContext);
  const [summaryData] = createResource(async () => {
    const res = await wrappedFetch(
      `${import.meta.env.VITE_API_URL}/academic/summary`
    );
    return (await res.json()) as ServerResponse<SummaryData>;
  });
  const [history] = createResource(async () => {
    const res = await wrappedFetch(
      `${import.meta.env.VITE_API_URL}/academic/history`
    );
    return (await res.json()) as Score[];
  });

  return (
    <main class="container mx-auto py-8 flex flex-col gap-4">
      {summaryData.state == "ready" && (
        <AcademicSummary summary={summaryData().data} />
      )}
    </main>
  );
}
