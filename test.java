public static int mystery(int n) 
{
    if (n == 0) return 0;
    return n + mystery(n - 1);
}