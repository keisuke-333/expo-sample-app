import { useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import { TextInput, View } from "react-native"
import Toast from "react-native-root-toast"
import { supabase } from "@/supabase/client"
import type { TodoType } from "../types"

type Props = {
  setTodos: Dispatch<SetStateAction<TodoType[] | null>>
}

export const TodoInput = ({ setTodos }: Props) => {
  const [task, setTask] = useState("")

  const handleAddTask = async () => {
    if (task.trim().length > 0) {
      const { data, error } = await supabase
        .from("todos")
        .insert([{ task, done: false }])
        .select()

      if (error) {
        Toast.show("登録に失敗しました。")
        return
      }

      if (data && data.length > 0) {
        Toast.show("登録しました！")
        setTodos((prevTodos) => [...(prevTodos || []), data[0]])
        setTask("")
      }
    }
  }

  return (
    <View>
      <TextInput
        className="border border-gray-300 rounded-md p-3 text-xl"
        value={task}
        placeholder="タスクを追加"
        onChangeText={setTask}
        returnKeyType="done"
        onSubmitEditing={handleAddTask}
      />
    </View>
  )
}
