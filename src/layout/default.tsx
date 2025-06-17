import NavBar from "@/components/navBar";
export default function defaultlayout() {
  return (
    <div>
      <NavBar currentTab="home" />
      {children}
    </div>
  );
}
