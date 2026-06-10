export async function register() {
    if (process.env.NEXT_RUNTIME !== 'nodejs') {
        return;
    }

    const { runCloudinaryStartupTest } = await import('@/lib/testCloudinaryConnection');
    await runCloudinaryStartupTest();
}
