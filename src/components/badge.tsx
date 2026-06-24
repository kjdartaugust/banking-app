import { cn } from "@/lib/utils";

const variants: Record<string, string> = {
  approved: "bg-success/15 text-success",
  active: "bg-success/15 text-success",
  completed: "bg-success/15 text-success",
  pending: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  not_started: "bg-muted text-muted-foreground",
  rejected: "bg-danger/15 text-danger",
  frozen: "bg-danger/15 text-danger",
  closed: "bg-muted text-muted-foreground",
};

export function Badge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        variants[status] ?? "bg-muted text-muted-foreground"
      )}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}
