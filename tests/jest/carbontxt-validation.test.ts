import { validateCarbonTxt } from "@/app/_utils/carbontxt-validation";

// TODO: Fix complete test structure
// TODO: Also, I can't seem to think of anything else to test using Jest, other than API routes. Utils are just fine as long as we don't change them massively. What exactly should we test?

describe("validateCarbonTxt", () => {
  test("should fail for no content", async () => {
    const result = await validateCarbonTxt({ content: noContent });

    if (result.errorOccurred) throw new Error("Received errorOccurred.");

    if (!result.success) {
      expect(result.missing).toBeDefined();
    }
  });

  test("should fail for missing disclosures and services", async () => {
    const result = await validateCarbonTxt({
      content: missingDisclosuresAndServices,
    });

    if (result.errorOccurred) throw new Error("Received errorOccurred.");

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.missing).toBeDefined();
    }
  });

  test("should fail for missing disclosures", async () => {
    const result = await validateCarbonTxt({
      content: missingDisclosures,
    });

    if (result.errorOccurred) throw new Error("Received errorOccurred.");

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.missing).toBeDefined();
    }
  });

  test("should pass for missing services", async () => {
    const result = await validateCarbonTxt({
      content: missingServices,
    });

    if (result.errorOccurred) throw new Error("Received errorOccurred.");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.disclosureUrlStatuses).toBeDefined();
    }
  });

  test("should fail for missing org table", async () => {
    const result = await validateCarbonTxt({
      content: missingOrgTable,
    });

    if (result.errorOccurred) throw new Error("Received errorOccurred.");

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.missing).toBeDefined();
    }
  });

  test("should fail for missing org and disclosures", async () => {
    const result = await validateCarbonTxt({
      content: missingOrgAndDisclosures,
    });

    if (result.errorOccurred) throw new Error("Received errorOccurred.");

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.missing).toBeDefined();
    }
  });

  test("should pass for missing upstream table", async () => {
    const result = await validateCarbonTxt({
      content: missingUpstreamTable,
    });

    if (result.errorOccurred) throw new Error("Received errorOccurred.");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.disclosureUrlStatuses).toBeDefined();
    }
  });

  test("should pass for missing upstream and services", async () => {
    const result = await validateCarbonTxt({
      content: missingUpstreamAndServices,
    });

    if (result.errorOccurred) throw new Error("Received errorOccurred.");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.disclosureUrlStatuses).toBeDefined();
    }
  });

  test("should fail for missing doc_type", async () => {
    const result = await validateCarbonTxt({
      content: missingDoc_type,
    });

    if (result.errorOccurred) throw new Error("Received errorOccurred.");

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.missing).toBeDefined();
    }
  });

  test("should fail for missing url", async () => {
    const result = await validateCarbonTxt({
      content: missingUrl,
    });

    if (result.errorOccurred) throw new Error("Received errorOccurred.");

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.missing).toBeDefined();
    }
  });

  test("should pass for missing domain", async () => {
    const result = await validateCarbonTxt({
      content: missingDomain,
    });

    if (result.errorOccurred) throw new Error("Received errorOccurred.");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.disclosureUrlStatuses).toBeDefined();
    }
  });

  test("should pass for valid content", async () => {
    const result = await validateCarbonTxt({
      content: validContent,
    });

    if (result.errorOccurred) throw new Error("Received errorOccurred.");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.disclosureUrlStatuses).toBeDefined();
    }
  });
});

// Contents used in tests
const noContent = `

`;

const missingDisclosuresAndServices = `
    [org]

    [upstream]
`;

const missingDisclosures = `
    [org]

    [upstream]
    services = [
        { domain = 'netlify.com', service_type = 'hosting-provider' }
    ]
`;

const missingServices = `
    [org]
    disclosures = [
        { doc_type = 'web-page', url = 'https://www.websitecarbon.com/website/future-first-design-netlify-app/', domain = 'websitecarbon.com' }
    ]

    [upstream]
`;

const missingOrgTable = `
    disclosures = [
        { doc_type = 'web-page', url = 'https://www.websitecarbon.com/website/future-first-design-netlify-app/', domain = 'websitecarbon.com' }
    ]

    [upstream]
    services = [
        { domain = 'netlify.com', service_type = 'hosting-provider' }
    ]
`;

const missingOrgAndDisclosures = `
    [upstream]
    services = [
        { domain = 'netlify.com', service_type = 'hosting-provider' }
    ]
`;

const missingUpstreamTable = `
    [org]
    disclosures = [
        { doc_type = 'web-page', url = 'https://www.websitecarbon.com/website/future-first-design-netlify-app/', domain = 'websitecarbon.com' }
    ]

    services = [
        { domain = 'netlify.com', service_type = 'hosting-provider' }
    ]
`;
const missingUpstreamAndServices = `
    [org]
    disclosures = [
        { doc_type = 'web-page', url = 'https://www.websitecarbon.com/website/future-first-design-netlify-app/', domain = 'websitecarbon.com' }
    ]
`;

const missingDoc_type = `
    [org]
    disclosures = [
        { url = 'https://www.websitecarbon.com/website/future-first-design-netlify-app/', domain = 'websitecarbon.com' }
    ]

    [upstream]
    services = [
        { domain = 'netlify.com', service_type = 'hosting-provider' }
    ]
`;

const missingUrl = `
    [org]
    disclosures = [
        { doc_type = 'web-page', domain = 'websitecarbon.com' }
    ]

    [upstream]
    services = [
        { domain = 'netlify.com', service_type = 'hosting-provider' }
    ]
`;
const missingDomain = `
    [org]
    disclosures = [
        { doc_type = 'web-page', url = 'https://www.websitecarbon.com/website/future-first-design-netlify-app/' }
    ]

    [upstream]
    services = [
        { domain = 'netlify.com', service_type = 'hosting-provider' }
    ]
`;

const validContent = `
    [org]
    disclosures = [
        { doc_type = 'web-page', url = 'https://www.websitecarbon.com/website/future-first-design-netlify-app/', domain = 'websitecarbon.com' }
    ]

    [upstream]
    services = [
        { domain = 'netlify.com', service_type = 'hosting-provider' }
    ]
`;
