function wait(name, seconds, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(`${name} ha fallado`));
                return;
            }

            console.log(`${name} terminado`);
            resolve(name);
        }, seconds * 1000);
    });
}

async function main() {
    try {
        const result = await wait("X", 2, true);

        console.log(result);
    } catch (error) {
        console.error("Capturado:", error.message);
    }
}

main();