import { For } from "solid-js";
import { SummaryData } from "~/types";
import Box from "./Box";

interface AcademicSummaryProps {
  summary: SummaryData;
}

export default function AcademicSummary(props: AcademicSummaryProps) {
  const data = props.summary;
  return (
    <div class="flex flex-col gap-2">
      <Box title="Data Mahasiswa">
        <table class="table-auto border-separate border-spacing-x-4 border-spacing-y-2">
          <tbody>
            <tr>
              <td>NPM</td>
              <td>{data.student.npm}</td>
            </tr>
            <tr>
              <td>Nama</td>
              <td>{data.student.name}</td>
            </tr>
            <tr>
              <td>Angkatan</td>
              <td>{data.student.year}</td>
            </tr>
            <tr>
              <td>Program Studi</td>
              <td>{data.student.major}</td>
            </tr>
            <tr>
              <td>Pembimbing Akademis</td>
              <td>{data.student.tutor}</td>
            </tr>
            <tr>
              <td>Status Akademis</td>
              <td>{data.student.status}</td>
            </tr>
            <tr>
              <td>SKS Lulus</td>
              <td>{data.student.credits_passed}</td>
            </tr>
            <tr>
              <td>SKS Diperoleh</td>
              <td>{data.student.credits_earned}</td>
            </tr>
            <tr>
              <td>Total Mutu</td>
              <td>{data.student.grade_points.toFixed(2)}</td>
            </tr>
            <tr>
              <td>IPK</td>
              <td>{data.student.gpa.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </Box>

      <div class="flex flex-row gap-2">
        <Box title="Distribusi Nilai">
          <table class="table-auto border-separate border-spacing-x-4 border-spacing-y-2">
            <tbody>
              <For each={[...Object.entries(data.scores_overview)]}>
                {(row, i) => (
                  <tr>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </Box>

        <Box class="grow" title="Riwayat">
          <table class="table-auto border-separate border-spacing-x-4 border-spacing-y-2 mx-auto">
            <tbody>
              <tr>
                <th colspan="2">Periode</th>
                <th colspan="5">Per Term/Semester</th>
                <th colspan="6">Kumulatif</th>
              </tr>
              <tr>
                <th>Tahun</th>
                <th>Term</th>
                <th>MK</th>
                <th>SKS A</th>
                <th>SKS L</th>
                <th>Mutu</th>
                <th>IP</th>
                <th>SKS A</th>
                <th>SKS L</th>
                <th>Mutu</th>
                <th>IPT</th>
                <th>IPK</th>
                <th>SKS Dpo</th>
              </tr>
              <For each={data.terms}>
                {(term, i) => (
                  <tr>
                    <td>{term.period}</td>
                    <td>{term.term}</td>
                    {term.data === null ? (
                      <td colSpan={11} class="text-center italic">
                        <span>Kosong</span>
                      </td>
                    ) : (
                      <>
                        <td>{term.data.subjects_taken}</td>
                        <td>{term.data.credits_taken}</td>
                        <td>{term.data.credits_passed}</td>
                        <td>{term.data.grade_point.toFixed(2)}</td>
                        <td>{term.data.grade_point_average.toFixed(2)}</td>
                        <td>{term.data.total_credits_taken}</td>
                        <td>{term.data.total_credits_passed}</td>
                        <td>{term.data.total_grade_point.toFixed(2)}</td>
                        <td>
                          {term.data.total_grade_point_average.toFixed(2)}
                        </td>
                        <td>
                          {term.data.total_passed_grade_point_average.toFixed(
                            2
                          )}
                        </td>
                        <td>{term.data.total_credits_earned}</td>
                      </>
                    )}
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </Box>
      </div>
    </div>
  );
}
