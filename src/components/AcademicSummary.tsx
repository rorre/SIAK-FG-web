import { For } from "solid-js";
import { SummaryData } from "~/types";

interface AcademicSummaryProps {
  summary: SummaryData;
}

export default function AcademicSummary(props: AcademicSummaryProps) {
  const data = props.summary;
  return (
    <div class="flex flex-col gap-2">
      <h3>Student Data</h3>
      <table class="table table-compact">
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
            <td>{data.student.grade_points}</td>
          </tr>
          <tr>
            <td>IPK</td>
            <td>{data.student.gpa}</td>
          </tr>
        </tbody>
      </table>

      <h3>Distribusi Nilai</h3>
      <table>
        <tbody class="table table-compact">
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
    </div>
  );
}
