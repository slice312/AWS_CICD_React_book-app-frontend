import ContentLoader from "react-content-loader";


export const SkeletonBookCard = () => {
    return (
        <ContentLoader
            speed={2}
            viewBox="0 0 440 180"
            width={440}
            height={180}
            backgroundColor="#D5D3D3"
            foregroundColor="#E1DFDF"
        >
            <rect x="0" y="0" rx="10" ry="10" width="440" height="180" />
        </ContentLoader>
    );
};