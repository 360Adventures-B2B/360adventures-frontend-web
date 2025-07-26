import SiteHeader from "@/app/(client-components)/(Header)/SiteHeader";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ClientCommons from "@/app/ClientCommons";
import FooterNav from "./FooterNav";
import { useGetSettingQuery } from "@/lib/services/settingService";
import Footer from "./Footer";
import { setSettings } from "@/lib/features/settingSlices";

export const LayoutContent = ({
  children,
  hideLayout,
}: {
  children: React.ReactNode;
  hideLayout: boolean;
}) => {
  const { data, isLoading, isFetching, isSuccess } = useGetSettingQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && data?.data) {
      dispatch(setSettings(data.data));
    }
  }, [isSuccess, data, dispatch]);

  return (
    <div>
      {!hideLayout && <ClientCommons />}
      {!hideLayout && <SiteHeader />}
      {children}
      {!hideLayout && <FooterNav />}
      {!hideLayout && <Footer />}
    </div>
  );
};
