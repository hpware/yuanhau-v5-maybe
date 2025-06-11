import TodoForm from "./TodoForm";

export default function Page() {
  return (
    <div className="justify-center align-center text-center m-1 absolute inset-0 flex flex-col">
      <h1 className="text-4xl text-bold">Create TODOs</h1>
      <TodoForm />
    </div>
  );
}
