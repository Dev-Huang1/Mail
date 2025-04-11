import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
  Font,
  Hr,
} from "@react-email/components"

interface EmailTemplateProps {
  subject?: string
  content?: string
}

const EmailTemplate = ({
  subject = "Welcome to Tech-Art Studio",
  content = "Thank you for connecting with Tech-Art Studio. We're excited to share our latest updates and services with you.",
}: EmailTemplateProps) => {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily={["Helvetica", "Arial", "sans-serif"]}
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Inter"
          fallbackFontFamily={["Helvetica", "Arial", "sans-serif"]}
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap",
            format: "woff2",
          }}
          fontWeight={600}
          fontStyle="normal"
        />
        <Font
          fontFamily="ECA-L"
          fallbackFontFamily={["Helvetica", "Arial", "sans-serif"]}
          webFont={{
            url: "https://cdn.xyehr.cn/font/source/ECA-Light.ttf",
            format: "truetype",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>{subject}</Preview>
      <Tailwind>
        <Body
          className="bg-white m-0 p-0 font-sans"
          style={{ fontFamily: "Helvetica, Arial, sans-serif", WebkitTextSizeAdjust: "100%", MsTextSizeAdjust: "100%" }}
        >
          <Container
            className="max-w-[600px] mx-auto p-[20px] bg-white"
            style={{ fontFamily: "ECA-L, Helvetica, Arial, sans-serif" }}
          >
            <Img
              src="https://cdn.xyehr.cn/images/svg/ta.svg"
              alt="logo"
              width="64"
              height="auto"
              className="mb-[20px]"
            />

            <Heading
              className="text-[24px] font-semibold text-[#333333] mb-[20px]"
              style={{
                fontFamily:
                  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
              }}
            >
              {subject}
            </Heading>

            <Text className="text-[16px] leading-[1.6] text-[#555555] mb-[15px]">{content}</Text>

            <Hr className="border-t border-[#e8e8e8] my-[40px] pt-[20px]" />

            <Section className="mb-[15px]">
              <div style={{ display: "flex", gap: "12px" }}>
                <Link href="https://x.com/Tech__Art" target="_blank">
                  <Img
                    src="https://cdn.xyehr.cn/images/svg/x.svg"
                    alt="X"
                    width="32"
                    height="auto"
                    style={{ opacity: 0.7 }}
                  />
                </Link>
                <Link href="https://github.com/TechArt_Studio" target="_blank">
                  <Img
                    src="https://cdn.xyehr.cn/images/svg/github.svg"
                    alt="GitHub"
                    width="32"
                    height="auto"
                    style={{ opacity: 0.7 }}
                  />
                </Link>
                <Link href="https://youtube.com/Tech-Art-Studio" target="_blank">
                  <Img
                    src="https://cdn.xyehr.cn/images/svg/youtube.svg"
                    alt="YouTube"
                    width="32"
                    height="auto"
                    style={{ opacity: 0.7 }}
                  />
                </Link>
              </div>
            </Section>

            <Text className="text-[10px] text-[#888888]" style={{ fontFamily: "ECA-L, Helvetica, Arial, sans-serif" }}>
              © 2025 Tech-Art Studio
            </Text>

            <Text className="text-[10px] text-[#888888]" style={{ fontFamily: "ECA-L, Helvetica, Arial, sans-serif" }}>
              If you want to know more about our studio, please visit our website or contact us through social media.
            </Text>

            <Text className="text-[10px] text-[#888888]" style={{ fontFamily: "ECA-L, Helvetica, Arial, sans-serif" }}>
              This studio (hereinafter referred to as the "Studio") provides various technical services based on web and
              front-end development. The services provided by the studio include but are not limited to: customized
              front-end development, design services, project consulting, and application development based on Next.js
              and Python.
            </Text>

            <Text className="text-[10px] text-[#888888]" style={{ fontFamily: "ECA-L, Helvetica, Arial, sans-serif" }}>
              Our services are regulated by Chinese and EU laws and regulations. To ensure the security of customer
              information, we always follow data protection regulations and strictly implement privacy protection
              policies in all service processes. If you have any questions about our services or need further
              information, please feel free to contact us through our customer service channels.
            </Text>

            <Text className="text-[10px] text-[#888888]" style={{ fontFamily: "ECA-L, Helvetica, Arial, sans-serif" }}>
              For services related to code hosting, deployment and development processes, we will operate on major
              platforms such as GitHub and Vercel to ensure the efficiency and security of the service.
            </Text>

            <Img
              src="https://cdn.xyehr.cn/images/svg/ta.svg"
              alt="logo"
              width="64"
              height="auto"
              className="mt-[10px]"
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default EmailTemplate
          
