// mutation.tsx
export interface LoginArgs {
    username: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    guest_session_id: string;
    // add other properties if needed
}

export const mutationLogin = async ({ username, password }: LoginArgs): Promise<LoginResponse> => {
    const res = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2UyYmMyOGZhM2IyN2IzYmM1MmY5OGU3MWE5OTVmZSIsIm5iZiI6MTcxOTk4MDIyMi4wMDIwMDIsInN1YiI6IjY2NmYyODg1NzhjY2UwMThjOTkzMGM0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dyPwPZskmLO6_ng1e8YbwtXTTXBeX-dX7x5tSgoRxFo',
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });

    if (!res.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await res.json();
    return data;
};
