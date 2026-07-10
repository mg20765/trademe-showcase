import styles from "./PageAds.module.css";
import PagesAds from "../../../assets/PagesAds.png";

export default function PageAds() {
  return (
    <>
      <section className={styles.container}>
        <h6>You may be interested in</h6>
        <img src={PagesAds} alt="ads" />
      </section>
    </>
  );
}
