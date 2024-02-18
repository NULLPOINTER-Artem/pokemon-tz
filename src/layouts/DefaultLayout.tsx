import { PropsWithChildren, useEffect } from "react";
import TheHeader from "../components/TheHeader";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type DefaultLayoutProps = PropsWithChildren<{
  className?: string,
}>;

export default function DefaultLayout({ children, className }: DefaultLayoutProps) {
  const notifies = useSelector((state: RootState) => state.notify.notifies);

  return <>
    <TheHeader />

    <main className={className}>
      {children}
    </main>

    <div className="notify-block">
      <Stack sx={{ width: '100%' }} spacing={2}>
        {notifies.map((notify) => (
          <Alert key={notify.id} severity={notify.severity}>{notify.message}</Alert>
        ))}
      </Stack>
    </div>
  </>
}
