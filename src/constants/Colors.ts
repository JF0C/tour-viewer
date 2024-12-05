export class Colors {
    public static readonly red600 = '#DC2626';
    public static readonly orange600 = '#EA580C';
    public static readonly amber600 = '#D97706';
    public static readonly yellow600 = '#CA8A04';
 
    public static readonly lime600 = '#65A30D';
    public static readonly green600 = '#16A34A';
    public static readonly emerald600 = '#059669';
    public static readonly teal600 = '#0D9488';
 
    public static readonly cyan600 = '#0891B2';
    public static readonly sky600 = '#0284C7';
    public static readonly blue600 = '#2563EB';
    public static readonly indigo600 = '#4F46E5';

    public static readonly violet600 = '#7C3AED';
    public static readonly purple600 = '#9333EA';
    public static readonly fuchsia600 = '#C026D3';
    public static readonly pink600 = '#DB2777';
    public static readonly rose600 = '#E11D48';
 
    public static readonly stone600 = '#57534E';
    public static readonly neutral600 = '#525252';
    public static readonly zinc600 = '#52525B';
    public static readonly gray600 = '#4B5563';
    public static readonly slate600 = '#475569';

    public static readonly palette = [
        Colors.red600,
        Colors.lime600,
        Colors.cyan600,
        Colors.violet600,
        Colors.stone600,
        Colors.orange600,
        Colors.green600,
        Colors.sky600,
        Colors.purple600,
        Colors.neutral600,
        Colors.amber600,
        Colors.emerald600,
        Colors.blue600,
        Colors.fuchsia600,
        Colors.zinc600,
        Colors.yellow600,
        Colors.teal600,
        Colors.indigo600,
        Colors.pink600,
        Colors.gray600,
        Colors.rose600,
        Colors.slate600
    ]

    public static colorCircle = (index: number) : string => {
        
        const color = Colors.palette[index % Colors.palette.length]
        return color;
    }
}