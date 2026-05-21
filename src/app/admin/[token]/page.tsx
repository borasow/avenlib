import DashboardClient from "./DashboardClient";

interface Props {
  params: { token: string };
}

export default function DashboardPage({ params }: Props) {
  return <DashboardClient token={params.token} />;
}
