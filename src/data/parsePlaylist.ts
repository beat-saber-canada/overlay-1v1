import { parseDifficultyString } from "./Difficulty"

interface Playlist {
  playlistTitle: string
  playlistAuthor: string
  songs: Song[]
  image: string
}

interface Song {
  songName: string
  levelAuthorName: string
  hash: string
  levelid: string
  difficulties: Difficulty[]
}

interface Difficulty {
  characteristic: string
  name: string
}

export const parsePlaylistString = (playlistString: string) => {
  const playlist = JSON.parse(playlistString) as Playlist
  return playlist.songs.map((song) => {
    return {
      hash: song.hash,
      difficulty: parseDifficultyString(song.difficulties[0].name),
    }
  })
}
