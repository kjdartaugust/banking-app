import { CheckCircle2, Clock, ShieldCheck, XCircle } from "lucide-react";
import { getProfile } from "@/lib/data";
import { KycForm } from "@/components/kyc-form";

export default async function KycPage() {
  const profile = await getProfile();

  if (profile.kyc_status === "approved") {
    return (
      <StatusCard
        icon={CheckCircle2}
        tone="text-success"
        title="You're verified"
        body="Your identity has been confirmed. All banking features are unlocked."
      />
    );
  }

  if (profile.kyc_status === "pending") {
    return (
      <StatusCard
        icon={Clock}
        tone="text-amber-500"
        title="Verification in review"
        body="We've received your submission and are reviewing it. This usually takes a few minutes."
      />
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <ShieldCheck className="h-6 w-6 text-primary" /> Identity verification
        </h1>
        <p className="text-sm text-muted-foreground">
          {profile.kyc_status === "rejected"
            ? "Your previous submission was rejected. Please resubmit with accurate details."
            : "Complete KYC to comply with banking regulations and unlock transfers."}
        </p>
      </div>
      {profile.kyc_status === "rejected" && (
        <div className="card flex items-center gap-2 border-danger/40 bg-danger/5 p-4 text-sm">
          <XCircle className="h-4 w-4 text-danger" /> Previous submission rejected.
        </div>
      )}
      <KycForm />
    </div>
  );
}

function StatusCard({
  icon: Icon,
  tone,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tone: string;
  title: string;
  body: string;
}) {
  return (
    <div className="mx-auto max-w-md">
      <div className="card p-8 text-center">
        <Icon className={`mx-auto h-12 w-12 ${tone}`} />
        <h1 className="mt-4 text-xl font-bold">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}
