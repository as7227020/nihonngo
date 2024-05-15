import { useState } from "react";
import "./confirmModal.css";
import Loading from "../../../../Loading";
type LoadingViewProps = {
  viewSwitch: boolean;
};
export default function LoadingView({ viewSwitch }: LoadingViewProps) {
  const [modalState, SetmodalState] = useState(false);

  return (
    <div>
      {viewSwitch && (
        <div className="topcss p-2">
          <div>
            <Loading />
          </div>
        </div>
      )}
    </div>
  );
}
