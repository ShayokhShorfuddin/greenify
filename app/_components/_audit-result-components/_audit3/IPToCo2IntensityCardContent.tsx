import { getIP } from "@/app/_utils/get-ip";
import logger from "@/logger";

type Type_APIResponse = {
  country_name: string;
  carbon_intensity_type: string;
  country_code_iso_2: string;
  carbon_intensity: number;
  generation_from_fossil: number;
  year: number;
};

export async function IPToCo2IntensityCardContent({ url }: { url: string }) {
  const hostname = new URL(url).hostname;

  // Get the IP of the host
  const getIpResult = await getIP(hostname);

  // If error occurred while getting IP
  if (getIpResult.errorOccurred) {
    return (
      <p className="text-sm mt-1 text-red-500">
        Failed to resolve IP address. We are investigating the issue. Try
        rechecking the url.
      </p>
    );
  }

  // If IP is obtained successfully, call the IP to CO2 intensity API
  let result: Type_APIResponse;

  try {
    const response = await fetch(
      `https://api.thegreenwebfoundation.org/api/v3/ip-to-co2intensity/${getIpResult.ip}`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      logger.error(
        `GWF Ip to CO2 intensity API is responded not ok: ${response}`,
      );
      return (
        <p className="text-sm mt-1 text-red-500">
          Failed to reach API. Try again later.
        </p>
      );
    }

    result = (await response.json()) as Type_APIResponse;
  } catch (error) {
    logger.error(`Failed while fetching Ip to CO2 intensity data: ${error}`);
    return (
      <p className="text-sm mt-1 text-red-500">
        Failed to perform audit. We are investigating the issue. Try rechecking
        the url.
      </p>
    );
  }

  return (
    <div className="mt-1 text-sm text-neutral-500">
      <div className="flex gap-x-1 items-center">
        <p>{result.country_name === "World" ? "Region:" : "Country:"}</p>

        {result.country_name === "World" ? (
          <p>World 🌎</p>
        ) : (
          <div className="flex gap-x-1 items-center">
            <p className="text-neutral-700">{result.country_name}</p>

            {/** biome-ignore lint/performance/noImgElement: <> */}
            <img
              src={`https://flagsapi.com/${result.country_code_iso_2}/shiny/24.png`}
              alt={`Flag of ${result.country_name}`}
            />
          </div>
        )}
      </div>

      <p className="mt-1">Intensity: {result.carbon_intensity} g/kWh</p>
      <p className="mt-1">
        Intensity type:{" "}
        {result.carbon_intensity_type.charAt(0).toUpperCase() +
          result.carbon_intensity_type.slice(1)}
      </p>
      <p className="mt-1">Data year: {result.year}</p>

      <hr className="w-full border-neutral-200 mt-2" />

      <p className="mt-2 font-medium text-neutral-700">Electricity spectrum</p>

      <div className="w-full h-2 bg-neutral-200 rounded mt-2">
        <div
          className="h-2 bg-green-500 rounded"
          style={{ width: `${100 - result.generation_from_fossil}%` }}
        />
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-x-2">
          <div className="size-2 bg-green-500 rounded-full" />
          <p>Renewable</p>
        </div>

        <p>{(100 - result.generation_from_fossil).toFixed(2)}%</p>
      </div>

      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-x-2">
          <div className="size-2 bg-neutral-400 rounded-full" />
          <p>Fossil</p>
        </div>

        <p>{result.generation_from_fossil.toFixed(2)}%</p>
      </div>
    </div>
  );
}
