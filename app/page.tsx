import TopDescription from "@/components/top/topDescription"
import ShowRequests from "@/components/top/showRequests"
import RequestForm from "@/components/top/requestForm"


export default function Home() {

  return (
    <main className="flex flex-col justify-center items-center h-screen gap-8">
      <TopDescription />
      <div className="flex flex-col items-center text-center gap-4">
        <RequestForm />
        <ShowRequests />
      </div>
    </main>
  );
}
