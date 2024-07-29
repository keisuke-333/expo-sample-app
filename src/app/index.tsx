import { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { supabase } from "@/supabase/client"
import { TodoInput } from "../components/TodoInput"
import { TodoList } from "../components/TodoList"
import type { TodoType } from "../types"

const Home = () => {
  const [todos, setTodos] = useState<TodoType[] | null>(null)

  const fetchTodos = async () => {
    const { data } = await supabase.from("todos").select("*")
    setTodos(data)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <SafeAreaView className="flex-1 mx-6 mt-4">
      <TodoInput setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </SafeAreaView>
  )
}

export default Home
