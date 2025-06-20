export default function Footer(currentTab: { currentTab: string }) {
  return (
    <div className="relative bottom-0 inset-x-0 justify-center align-middle text-center mt-4 mb-2 p-1">
      &copy; {new Date().getFullYear()} Yuan-Hau Wu
    </div>
  );
}
