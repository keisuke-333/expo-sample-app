import { useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import { View, Text, TouchableOpacity, TextInput } from "react-native"
import Checkbox from "expo-checkbox"
import { Entypo } from "@expo/vector-icons"
import Toast from "react-native-root-toast"
import { supabase } from "@/supabase/client"
import type { TodoType } from "../types"

type Props = {
  item: TodoType
  setTodos: Dispatch<SetStateAction<TodoType[] | null>>
}

export const TodoItem = ({ item, setTodos }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState(item.task)

  const handleToggleDone = async (isDone: boolean) => {
    try {
      const { data, error } = await supabase
        .from("todos")
        .update({ done: isDone })
        .eq("id", item.id)
        .select()

      if (error) {
        Toast.show("更新に失敗しました。")
        return
      }

      if (data && data.length > 0) {
        setTodos((prevTodos) => {
          if (!prevTodos) return null
          return prevTodos.map((todo) =>
            todo.id === data[0].id ? data[0] : todo
          )
        })
        Toast.show("更新しました！")
      }
    } catch (error) {
      Toast.show("更新に失敗しました。")
    }
  }

  const handleEdit = async () => {
    if (!isEditing) {
      setIsEditing(true)
      return
    }

    try {
      const { data, error } = await supabase
        .from("todos")
        .update({ task: editedTask })
        .eq("id", item.id)
        .select()

      if (error) {
        Toast.show("更新に失敗しました。")
        return
      }

      if (data && data.length > 0) {
        setTodos((prevTodos) => {
          if (!prevTodos) return null
          return prevTodos.map((todo) =>
            todo.id === data[0].id ? data[0] : todo
          )
        })
        Toast.show("更新しました！")
        setIsEditing(false)
      }
    } catch (error) {
      Toast.show("更新に失敗しました。")
    }
  }

  const handleDelete = async () => {
    try {
      const { data, error } = await supabase
        .from("todos")
        .delete()
        .eq("id", item.id)
        .select()

      if (error) {
        Toast.show("削除に失敗しました。")
        return
      }

      if (data && data.length > 0) {
        setTodos((prevTodos) => {
          if (!prevTodos) return null
          return prevTodos.filter((todo) => todo.id !== item.id)
        })
        Toast.show("削除しました！")
      }
    } catch (error) {
      Toast.show("削除に失敗しました。")
    }
  }

  return (
    <View className="flex flex-row items-center justify-between py-2 border-b">
      <View className="flex flex-row items-center gap-3">
        <Checkbox
          value={item.done as boolean}
          onValueChange={(isDone) => handleToggleDone(isDone)}
        />
        {isEditing ? (
          <TextInput
            value={editedTask as string}
            onChangeText={setEditedTask}
            autoFocus
            onSubmitEditing={handleEdit}
            returnKeyType="done"
            className="text-2xl"
          />
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text className={`${item.done ? "line-through" : ""} text-2xl`}>
              {item.task}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity onPress={handleDelete}>
        <Entypo name="circle-with-cross" size={28} color="red" />
      </TouchableOpacity>
    </View>
  )
}
