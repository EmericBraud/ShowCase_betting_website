import { MultiBox } from './MultiBox';
import { Progress } from '@nextui-org/progress';

export const Indicator = ({ title, value }: { title: string; value: string }) => {
    return (
        <div className="min-h-full flex flex-col justify-between">
            <p className="text-sm text-default-500">{title}</p>
            <p className="text-lg">{value}</p>
        </div>
    );
};

export const IndicatorBonusOpened = ({
    title,
    total,
    opened,
}: {
    title: string;
    total: number;
    opened: number;
}) => {
    return (
        <div className="flex flex-col">
            <p className="text-sm text-default-500">{title}</p>
            <Progress
                classNames={{
                    base: 'max-w-md relative',
                    track: 'drop-shadow-md border border-default',
                    indicator: 'bg-gradient-to-r from-pink-500 to-yellow-500',
                    label: 'tracking-wider font-medium font-bold text-default-600 w-full text-center absolute z-[200] top-1 [text-shadow:_1_1px_1_rgb(0_0_0_/_100%)]',
                    value: 'text-foreground/60',
                }}
                label={`${opened}/${total}`}
                radius="sm"
                showValueLabel={false}
                size="lg"
                value={(opened / total) * 100}
            />
        </div>
    );
};

export const IndicatorMulti = ({
    title,
    value,
    color,
}: {
    title: string;
    value: number;
    color: string;
}) => {
    return (
        <div className="min-h-full flex flex-col justify-between">
            <p className="text-sm text-default-500">{title}</p>
            <MultiBox value={value} color={color} />
        </div>
    );
};

export const IndicatorGainLoose = ({
    title,
    gain,
    bet,
}: {
    title: string;
    gain: number;
    bet: number;
}) => {
    let value: number;
    if (bet === 0 && gain === 0) {
        value = 1;
    } else {
        value = gain / bet;
    }
    return (
        <div className="min-h-full flex flex-col justify-between">
            <p className="text-sm text-default-500">{title}</p>
            <div className="flex flex-row gap-3">
                <p className="text-green-400">{gain - bet}€</p>
                <MultiBox value={value} color={'green'} />
            </div>
        </div>
    );
};
