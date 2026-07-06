interface Props {
  status: string;
}

export function BookingStatusBadge({ status }: Props) {
  let bgColor = 'bg-zinc-800';
  let textColor = 'text-zinc-300';
  let dotColor = 'bg-zinc-500';

  switch (status.toUpperCase()) {
    case 'PENDING':
      bgColor = 'bg-yellow-500/10';
      textColor = 'text-yellow-500';
      dotColor = 'bg-yellow-500';
      break;
    case 'CONFIRMED':
      bgColor = 'bg-green-500/10';
      textColor = 'text-green-500';
      dotColor = 'bg-green-500';
      break;
    case 'CANCELLED':
    case 'REJECTED':
      bgColor = 'bg-red-500/10';
      textColor = 'text-red-500';
      dotColor = 'bg-red-500';
      break;
    case 'COMPLETED':
      bgColor = 'bg-blue-500/10';
      textColor = 'text-blue-500';
      dotColor = 'bg-blue-500';
      break;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotColor} animate-pulse`}></span>
      {status}
    </span>
  );
}
