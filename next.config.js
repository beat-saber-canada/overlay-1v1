const relay = require("./relay.config.js")
/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    relay,
  },
}

module.exports = nextConfig
