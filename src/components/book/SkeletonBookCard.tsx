import ContentLoader from "react-content-loader";

import css from "./bookCard.module.scss";


export const SkeletonBookCard = () => {
    return (
        <div className={css.bookCard}>
            <ContentLoader
                speed={2}
                viewBox="0 0 440 180"
                width={440}
                height={180}
                backgroundColor="#D5D3D3"
                foregroundColor="#E1DFDF"
            >
                <rect x="0" y="0" rx="5" ry="5" width="350" height="20" />
                <rect x="0" y="30" rx="5" ry="5" width="175" height="15" />
                <rect x="400" y="0" rx="12" ry="12" width="40" height="40" />
                <rect x="400" y="95" rx="12" ry="12" width="40" height="40" />
                <rect x="0" y="55" rx="5" ry="5" width="350" height="80" />
            </ContentLoader>
        </div>
    );
};