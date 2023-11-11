import { z } from "zod"

const baseSchema = {
  key: z.string(),
  enableAudio: z.boolean(),
}
const streamTypeEnum = z.enum(["twitch", "rtmp"])
const twitchSchema = z.object({
  type: z.literal(streamTypeEnum.enum.twitch),
  key: baseSchema.key.url("Invalid URL"),
  enableAudio: baseSchema.enableAudio,
})
const rtmpSchema = z.object({
  type: z.literal(streamTypeEnum.enum.rtmp),
  key: baseSchema.key.optional(),
  enableAudio: baseSchema.enableAudio,
})
const streamSchema = z.discriminatedUnion("type", [twitchSchema, rtmpSchema])

export default streamSchema
