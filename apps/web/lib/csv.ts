type ExportFormResponsesCsvData = {
  fields: {
    id: string;
    label: string;
  }[];
  responses: {
    id: string;
    submittedAt: Date | string;
    answers: {
      fieldId: string;
      value: string | null;
    }[];
  }[];
};

const escapeCsv = (value: unknown): string => {
  if (value == null) return "";

  const str = String(value);

  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
};

const generateResponsesCsv = (data: ExportFormResponsesCsvData): string => {
  const { fields, responses } = data;

  const headers = ["Submitted At", ...fields.map((field) => field.label)];

  const rows = responses.map((response) => {
    const answerMap = new Map(response.answers.map((answer) => [answer.fieldId, answer.value]));

    return [
      new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(new Date(response.submittedAt)),

      ...fields.map((field) => {
        const value = answerMap.get(field.id);

        if (!value) return "";

        try {
          const parsed = JSON.parse(value);

          if (Array.isArray(parsed)) {
            return parsed.join(", ");
          }

          return parsed;
        } catch {
          return value;
        }
      }),
    ];
  });

  return [
    headers.map(escapeCsv).join(","),
    ...rows.map((row) => row.map(escapeCsv).join(",")),
  ].join("\n");
};

export const exportFormResponsesCsv = (
  formTitle: string | undefined,
  data: ExportFormResponsesCsvData,
) => {
  const csv = generateResponsesCsv(data);

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${formTitle}-responses.csv`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};
