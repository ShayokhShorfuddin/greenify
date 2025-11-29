// Informer: The script that collects page data and sends it back to Greenify backend for analytics

type Resource = {
  url: string; // The URL of the file
  type: string; // The type of the file
  duration: number; // How long it took to download (ms)
  transferSize: number; // Bytes transferred over network
};

type Payload = {
  projectId: string;
  totalTransferSize: number;
  resources: Resource[];
};

const collectedResources: PerformanceResourceTiming[] = [];

// Setup the Observer
const observer = new PerformanceObserver((list) => {
  // This callback fires whenever new resources are loaded
  // AND immediately for past resources because of 'buffered: true'
  const entries = list.getEntries() as PerformanceResourceTiming[];

  entries.forEach((entry) => {
    collectedResources.push(entry);
  });
});

// Start observing
// Strictly look for 'resource' types
observer.observe({ type: "resource", buffered: true });

// 3. Send data on Load (same as before)
window.addEventListener("load", () => {
  // Wait a moment for final assets to settle
  setTimeout(() => {
    // Stop observing to save memory/CPU once we are ready to send
    observer.disconnect();

    const payload: Payload = {
      // TODO: This is supposed to be set automatically when we hand over the script to users. Hardcoded for now for testing.
      // TODO: What if this id gets leaked and people spam our backend with fake data? Look at the bottom of this file.
      projectId: "69243a4c425a03c34c76a53e",

      totalTransferSize: collectedResources.reduce(
        (acc, curr) => acc + curr.transferSize,
        0,
      ),

      // Why not `entry.initiatorType` for asset type? Because it's often inaccurate. Check https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming/initiatorType
      resources: collectedResources.map((entry) => ({
        url: entry.name,
        type: determineAssetType(entry.name),
        duration: parseFloat(entry.duration.toFixed(2)),
        transferSize: entry.transferSize,
      })),
    };

    // Send to backend (using Beacon)
    const blob = new Blob([JSON.stringify(payload)], {
      type: "application/json",
    });
    // TODO: Change the URL to production url before deployment and compile this script
    navigator.sendBeacon(
      "http://localhost:3001/api/information-receiver",
      blob,
    );
  }, 4000);
});

function determineAssetType(url: string): string {
  // 1. Strip query parameters (?) and fragments (#) to isolate the filename
  const cleanUrl = url.split(/[?#]/)[0];

  // 2. Images (Extended to include modern AVIF and common vectors)
  if (/\.(png|jpe?g|gif|webp|avif|svg|ico|bmp|tiff)$/i.test(cleanUrl)) {
    return "img";
  }

  // 3. Stylesheets
  if (/\.css$/i.test(cleanUrl)) {
    return "css";
  }

  // 4. Scripts (Standard JS and Modules)
  if (/\.(js|mjs|jsx|ts|tsx)$/i.test(cleanUrl)) {
    return "script";
  }

  // 5. Fonts
  if (/\.(woff|woff2|ttf|otf|eot)$/i.test(cleanUrl)) {
    return "font";
  }

  // 6. Media (Video and Audio)
  if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i.test(cleanUrl)) {
    return "media";
  }

  // 7. Data / XHR
  if (/\.(json|xml|csv|txt)$/i.test(cleanUrl)) {
    return "fetch";
  }

  // 8. HTML / Document
  if (/\.(html|htm|php|asp|aspx|jsp)$/i.test(cleanUrl)) {
    return "document";
  }

  // 9. Downloadable
  if (/\.(pdf|docx?|xlsx?|pptx?|txt|rtf)$/i.test(cleanUrl)) {
    return "downloadable";
  }

  // Miscellaneous
  return "misc";
}

// TODO (Will think about it later): If our API url gets compromised, people can spam our backend using Postman with fake data. Should we have some sort of token system? Yes!

// The most straightforward approach is to embed a unique project ID directly into the script when users download/copy it. Here are a few implementation options:

// const payload: Payload = {
//   projectId: "PROJECT_ID_PLACEHOLDER", // Replace when serving
//   url: window.location.href,
//   totalTransferSize: collectedResources.reduce(/*...*/),
//   resources: collectedResources.map(/*...*/),
// };

// Then when a user requests the script, you'd replace PROJECT_ID_PLACEHOLDER with their actual project ID.
