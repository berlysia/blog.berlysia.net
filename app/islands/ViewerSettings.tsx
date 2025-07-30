import { useRef, useEffect } from "hono/jsx";
import { useViewerSettings } from "../lib/viewerSettings";

function ClientViewerSettings() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { settings, toggleTextDecorationThickness, toggleWebkitLineClamp } =
    useViewerSettings();

  // bodyクラスの管理
  useEffect(() => {
    const body = document.body;

    body.classList.toggle(
      "use-text-decoration-workaround",
      !settings.useTextDecorationThickness
    );
    body.classList.toggle("use-webkit-line-clamp", settings.useWebkitLineClamp);

    return () => {
      body.classList.remove(
        "use-text-decoration-workaround",
        "use-webkit-line-clamp"
      );
    };
  }, [settings]);

  const openModal = () => {
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClick = (event: MouseEvent) => {
      if (event.target === dialog) {
        console.log("dialog clicked", event.target);
        closeModal();
      }
    };

    dialog.addEventListener("click", handleClick);
    return () => dialog.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <button
        type="button"
        className="tw-h-8 tw-w-8 tw-flex tw-justify-center tw-items-center"
        onClick={openModal}
        title="表示設定"
      >
        <img
          src="/static/icons/settings.svg"
          alt="表示設定"
          className="tw-h-6 tw-w-6"
        />
      </button>

      <dialog
        ref={dialogRef}
        className="tw-p-6 tw-rounded-lg tw-shadow-lg tw-max-w-xl tw-w-full"
      >
        <div className="tw-space-y-4">
          <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
            <h2 className="tw-text-xl tw-font-bold">表示設定</h2>
            <button
              type="button"
              onClick={closeModal}
              className="tw-p-1 tw-text-gray-500 hover:tw-text-gray-700 tw-transition-colors"
              title="閉じる"
            >
              <img
                src="/static/icons/xmark.svg"
                alt="閉じる"
                className="tw-h-6 tw-w-6"
              />
            </button>
          </div>

          <div className="tw-space-y-4">
            <div className="tw-p-4">
              <h3 className="tw-font-bold tw-text-base tw-mb-2">
                Safari縦書き時の不具合確認
              </h3>

              <div className="tw-space-y-3">
                <div className="tw-border tw-border-gray-200 tw-rounded-lg tw-p-3">
                  <label
                    htmlFor="text-decoration-thickness"
                    className="tw-cursor-pointer tw-grid tw-grid-cols-[auto_1fr] tw-grid-rows-[auto_auto] tw-gap-x-3 tw-gap-y-2"
                  >
                    <input
                      type="checkbox"
                      id="text-decoration-thickness"
                      className="tw-row-start-1 tw-col-start-1"
                      checked={settings.useTextDecorationThickness}
                      onChange={toggleTextDecorationThickness}
                    />
                    <h4 className="tw-font-medium tw-row-start-1 tw-col-start-2">
                      マーカー表現にtext-decoration-thicknessを使用
                    </h4>
                    <div className="tw-text-sm tw-text-gray-600 tw-row-start-2 tw-col-start-2">
                      linear-gradientで実現するマーカー表現を、text-decoration-thicknessに置き換えます。Safariで縦書きの場合に表示が乱れます。
                    </div>
                  </label>
                </div>

                <div className="tw-border tw-border-gray-200 tw-rounded-lg tw-p-3">
                  <label
                    htmlFor="native-line-clamp"
                    className="tw-cursor-pointer tw-grid tw-grid-cols-[auto_1fr] tw-grid-rows-[auto_auto] tw-gap-x-3 tw-gap-y-2"
                  >
                    <input
                      type="checkbox"
                      id="native-line-clamp"
                      className="tw-row-start-1 tw-col-start-1"
                      checked={settings.useWebkitLineClamp}
                      onChange={toggleWebkitLineClamp}
                    />
                    <h4 className="tw-font-medium tw-row-start-1 tw-col-start-2">
                      -webkit-line-clamp を使用
                    </h4>
                    <div className="tw-text-sm tw-text-gray-600 tw-row-start-2 tw-col-start-2">
                      複数行でのline-clampに対して-webkit-line-clampを使うようにします。Safariで縦書きの場合に表示が
                      <strong>大きく</strong>乱れます。
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="tw-text-sm tw-text-gray-500 tw-mt-4">
              <p>※ 設定は自動的に保存され、次回アクセス時も維持されます。</p>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

function ServerViewerSettings() {
  return <></>;
}

export default function ViewerSettings() {
  if (import.meta.env.SSR) {
    return <ServerViewerSettings />;
  }

  return <ClientViewerSettings />;
}
