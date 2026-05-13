import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  trailingSlash: true,
  /* Set the root directory for file tracing to resolve workspace inference warnings */
  outputFileTracingRoot: path.join(__dirname, "./"),
};

export default nextConfig;
