import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  // Github Settings > Developer > settings > Login with github > Client ID
  const CLINET_ID = 'abc08d99fc8b73418b17';

  // const [rerender, setRerender] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // /?code=ABCD...
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get('code');
    console.log(codeParam);
  }, []);

  function loginWithGithub() {
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLINET_ID}`);
  }
  return (
    <div className="flex flex-col items-center gap-4 text-[21px]">
      <div>
        <button onClick={loginWithGithub}>Login with Github</button>
      </div>
      <div>
        <button onClick={() => navigate('signUp')}>Sign Up</button>
      </div>
      <div>
        <button onClick={() => navigate('news')}>Home - News</button>
      </div>
      <div>
        <button onClick={() => navigate('community')}>Community</button>
      </div>
    </div>
  );
}
