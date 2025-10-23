import { validateCarbonTxt } from "@/app/_utils/carbontxt-validation";

describe("validateCarbonTxt", () => {
  test("should fail for no content", async () => {
    const result = await validateCarbonTxt({ content: noContent });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.missing).toBeDefined();
    }
  });

  test("should fail for missing disclosures and services", async () => {
    const result = await validateCarbonTxt({
      content: missingDisclosuresAndServices,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.missing).toBeDefined();
    }
  });

  test("should fail for missing disclosures", async () => {
    const result = await validateCarbonTxt({
      content: missingDisclosures,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.missing).toBeDefined();
    }
  });

  test("should pass for missing services", async () => {
    const result = await validateCarbonTxt({
      content: missingServices,
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.disclosureUrlStatuses).toBeDefined();
    }
  });

  test("should fail for missing org table", async () => {
    const result = await validateCarbonTxt({
      content: missingOrgTable,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.missing).toBeDefined();
    }
  });

  test("should fail for missing org and disclosures", async () => {
    const result = await validateCarbonTxt({
      content: missingOrgAndDisclosures,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.missing).toBeDefined();
    }
  });

  test("should pass for missing upstream table", async () => {
    const result = await validateCarbonTxt({
      content: missingUpstreamTable,
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.disclosureUrlStatuses).toBeDefined();
    }
  });

  test("should pass for missing upstream and services", async () => {
    const result = await validateCarbonTxt({
      content: missingUpstreamAndServices,
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.disclosureUrlStatuses).toBeDefined();
    }
  });

  test("should fail for missing doc_type", async () => {
    const result = await validateCarbonTxt({
      content: missingDoc_type,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.missing).toBeDefined();
    }
  });

  test("should fail for missing url", async () => {
    const result = await validateCarbonTxt({
      content: missingUrl,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.missing).toBeDefined();
    }
  });

  test("should pass for missing domain", async () => {
    const result = await validateCarbonTxt({
      content: missingDomain,
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.disclosureUrlStatuses).toBeDefined();
    }
  });

  test("should pass for valid content", async () => {
    const result = await validateCarbonTxt({
      content: validContent,
    });

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
