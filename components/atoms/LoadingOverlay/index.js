import styles from "./index.module.css";

export default function LoadingOverlay() {
  return (
    <div className="w-screenh h-screen fixed inset-0 bg-black bg-opacity-20 z-10 flex items-center justify-center">
      <div className={styles["lds-ripple"]}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
