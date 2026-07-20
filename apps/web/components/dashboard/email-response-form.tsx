import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type Response = {
  question: string;
  answer: string | string[];
};

type FormResponseEmailProps = {
  formTitle: string;
  formDescription?: string;
  submittedAt: string;
  responses: Response[];
};

export default function FormResponseEmail({
  formTitle,
  formDescription,
  submittedAt,
  responses,
}: FormResponseEmailProps) {
  return (
    <Html>
      <Head />

      <Preview>Your response to "{formTitle}"</Preview>

      <Body
        style={{
          margin: 0,
          backgroundColor: "#f5f5f4",
          fontFamily:
            '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
          padding: "40px 0",
        }}
      >
        <Container
          style={{
            maxWidth: "680px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid #e7e5e4",
          }}
        >
          {/* Header */}

          <Section
            style={{
              padding: "40px",
              borderBottom: "1px solid #ececec",
            }}
          >
            <Text
              style={{
                fontSize: "13px",
                color: "#78716c",
                margin: 0,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Kanso
            </Text>

            <Heading
              style={{
                marginTop: "14px",
                marginBottom: "10px",
                fontSize: "30px",
                color: "#111827",
              }}
            >
              Thank you for your response
            </Heading>

            <Text
              style={{
                fontSize: "16px",
                color: "#44403c",
                margin: 0,
              }}
            >
              Your response has been successfully submitted.
            </Text>

            <Hr />

            <Text
              style={{
                marginBottom: "8px",
                fontWeight: 600,
                color: "#111827",
                fontSize: "18px",
              }}
            >
              {formTitle}
            </Text>

            {formDescription && (
              <Text
                style={{
                  color: "#78716c",
                  marginTop: 0,
                  marginBottom: "18px",
                  fontSize: "15px",
                }}
              >
                {formDescription}
              </Text>
            )}

            <Text
              style={{
                fontSize: "14px",
                color: "#78716c",
                margin: 0,
              }}
            >
              Submitted on {submittedAt}
            </Text>
          </Section>

          {/* Responses */}

          <Section
            style={{
              padding: "40px",
            }}
          >
            <Heading
              as="h2"
              style={{
                fontSize: "22px",
                marginTop: 0,
                marginBottom: "28px",
                color: "#111827",
              }}
            >
              Response Summary
            </Heading>

            {responses.map((response, index) => (
              <Section
                key={index}
                style={{
                  marginBottom: "28px",
                }}
              >
                <Text
                  style={{
                    fontWeight: 600,
                    color: "#111827",
                    fontSize: "16px",
                    marginBottom: "10px",
                  }}
                >
                  {index + 1}. {response.question}
                </Text>

                <Section
                  style={{
                    backgroundColor: "#fafaf9",
                    border: "1px solid #e7e5e4",
                    borderRadius: "10px",
                    padding: "16px",
                  }}
                >
                  {Array.isArray(response.answer) ? (
                    response.answer.map((item, i) => (
                      <Text
                        key={i}
                        style={{
                          margin: "0 0 8px",
                          color: "#292524",
                          fontSize: "15px",
                        }}
                      >
                        ✓ {item}
                      </Text>
                    ))
                  ) : (
                    <Text
                      style={{
                        margin: 0,
                        whiteSpace: "pre-wrap",
                        color: "#292524",
                        fontSize: "15px",
                        lineHeight: "24px",
                      }}
                    >
                      {response.answer || "—"}
                    </Text>
                  )}
                </Section>
              </Section>
            ))}
          </Section>

          {/* Footer */}

          <Section
            style={{
              padding: "24px 40px",
              borderTop: "1px solid #ececec",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#78716c",
                fontSize: "13px",
                margin: 0,
              }}
            >
              This is an automated confirmation email.
            </Text>

            <Text
              style={{
                textAlign: "center",
                color: "#a8a29e",
                fontSize: "12px",
                marginTop: "8px",
              }}
            >
              Powered by <strong>Kanso</strong>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}