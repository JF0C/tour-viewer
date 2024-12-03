import * as React from 'react';

const refreshTokenKey = 'strava-refresh-token';

export const useStravaRefreshToken = (): [string | null, (newValue: string | null) => void] => {
    const [refreshToken, setRefreshToken] = React.useState<string | null>(
        JSON.parse(localStorage.getItem(refreshTokenKey) ?? 'null')
    );

    React.useEffect(() => {
        localStorage.setItem(refreshTokenKey, JSON.stringify(refreshToken));
    }, [refreshToken]);

    return [refreshToken, setRefreshToken];
};