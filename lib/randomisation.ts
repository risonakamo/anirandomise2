import randomNumber from "random-number-csprng";

/** return a random value from a given array using csrng */
export async function cspSample<T>(array:T[]):Promise<T>
{
    if (array.length==1)
    {
        return array[0];
    }

    return array[await randomNumber(0,array.length-1)];
}