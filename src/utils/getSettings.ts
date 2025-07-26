import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

export function useSettingValue(key: string): string | null {
  const settings = useSelector((state: RootState) => state.setting.settings);
  return settings.find((item) => item.key === key)?.value ?? null;
}
