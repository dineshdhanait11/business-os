type Props = {
  title: string;
  value: string | number;
};

export default function DashboardCard({ title, value }: Props) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "12px",
      padding: "16px",
      minWidth: "180px"
    }}>
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
}
