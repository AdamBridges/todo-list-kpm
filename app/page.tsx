import App from './pages/_app';
import {HomePageView} from './pages/home/home_page_view';

export default function page() {
    return (
        <App
            pageProps={undefined}
            Component={HomePageView}
            router={{} as any}
        />
    );
}
