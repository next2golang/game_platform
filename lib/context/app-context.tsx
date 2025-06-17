"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

interface User {
  id: string
  username: string
  email: string
  avatar?: string
  favoriteGame: string
  role: string
  totalVideos: number
  totalLikes: number
  totalViews: number
  rank: string
}

interface Video {
  id: string
  title: string
  description: string
  game: string
  author: string
  authorId: string
  authorAvatar?: string
  thumbnail?: string
  videoUrl?: string
  duration: string
  views: number
  likes: number
  comments: number
  createdAt: string
  tags: string[]
  isLiked?: boolean
}

interface Comment {
  id: string
  videoId: string
  userId: string
  username: string
  avatar?: string
  content: string
  createdAt: string
  likes: number
}

interface AppState {
  user: User | null
  isAuthenticated: boolean
  videos: Video[]
  comments: Comment[]
  currentVideo: Video | null
  isLoading: boolean
  searchQuery: string
  selectedGame: string
}

type AppAction =
  | { type: "SET_USER"; payload: User }
  | { type: "LOGOUT" }
  | { type: "SET_VIDEOS"; payload: Video[] }
  | { type: "ADD_VIDEO"; payload: Video }
  | { type: "UPDATE_VIDEO"; payload: Video }
  | { type: "LIKE_VIDEO"; payload: string }
  | { type: "SET_CURRENT_VIDEO"; payload: Video }
  | { type: "ADD_COMMENT"; payload: Comment }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_GAME_FILTER"; payload: string }

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  videos: [],
  comments: [],
  currentVideo: null,
  isLoading: false,
  searchQuery: "",
  selectedGame: "all",
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      }
    case "SET_VIDEOS":
      return {
        ...state,
        videos: action.payload,
      }
    case "ADD_VIDEO":
      return {
        ...state,
        videos: [action.payload, ...state.videos],
      }
    case "UPDATE_VIDEO":
      return {
        ...state,
        videos: state.videos.map((v) => (v.id === action.payload.id ? action.payload : v)),
      }
    case "LIKE_VIDEO":
      return {
        ...state,
        videos: state.videos.map((v) =>
          v.id === action.payload ? { ...v, likes: v.isLiked ? v.likes - 1 : v.likes + 1, isLiked: !v.isLiked } : v,
        ),
      }
    case "SET_CURRENT_VIDEO":
      return {
        ...state,
        currentVideo: action.payload,
      }
    case "ADD_COMMENT":
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      }
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      }
    case "SET_SEARCH":
      return {
        ...state,
        searchQuery: action.payload,
      }
    case "SET_GAME_FILTER":
      return {
        ...state,
        selectedGame: action.payload,
      }
    default:
      return state
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Initialize with mock data
  useEffect(() => {
    const mockVideos: Video[] = [
      {
        id: "video-1",
        title: "完璧なガンク回避テクニック",
        description: "ミニマップの情報を活用した効果的なガンク回避方法",
        game: "League of Legends",
        author: "ProGamer123",
        authorId: "1",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        thumbnail: "/placeholder.svg?height=200&width=350",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: "0:45",
        views: 1234,
        likes: 89,
        comments: 23,
        createdAt: "2024-01-15",
        tags: ["ガンク", "視界管理", "ミニマップ"],
        isLiked: false,
      },
      {
        id: "video-2",
        title: "チームファイト時の完璧なポジショニング",
        description: "ADCとして最適なポジションを維持する方法",
        game: "League of Legends",
        author: "ADCMaster",
        authorId: "2",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        thumbnail: "/placeholder.svg?height=200&width=350",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: "1:20",
        views: 2156,
        likes: 156,
        comments: 45,
        createdAt: "2024-01-14",
        tags: ["チームファイト", "ポジショニング", "ADC"],
        isLiked: false,
      },
    ]
    dispatch({ type: "SET_VIDEOS", payload: mockVideos })
  }, [])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within AppProvider")
  }
  return context
}
