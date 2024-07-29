import type { Dispatch, SetStateAction } from "react"
import { View, FlatList } from "react-native"
import { TodoItem } from "./TodoItem"
import type { TodoType } from "../types"

type Props = {
  todos: TodoType[] | null
  setTodos: Dispatch<SetStateAction<TodoType[] | null>>
}

export const TodoList = ({ todos, setTodos }: Props) => {
  return (
    <View className="my-9">
      <FlatList
        data={todos}
        renderItem={({ item }) => <TodoItem item={item} setTodos={setTodos} />}
        keyExtractor={(item) => item.id.toString()}
        className="border-t"
      />
    </View>
  )
}
