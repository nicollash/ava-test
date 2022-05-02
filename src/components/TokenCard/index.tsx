import { FC, useState } from "react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

import { IToken } from "types/IToken";

import "./styles.css";

interface IProps {
  token: IToken;
}

interface ITooltipProps {
  payload: any;
  active?: boolean;
  minValue: number;
  label: string;
}

const CustomTooltip: FC<ITooltipProps> = ({ payload, active, minValue }) => {
  if (!active) {
    return null;
  }

  return (
    <div className="rounded-md bg-background py-1 px-2 text-white">
      <span>
        $
        {Number(payload[0].value + minValue).toLocaleString(undefined, {
          maximumFractionDigits: 4,
        })}
      </span>
    </div>
  );
};

const TokenCard: FC<IProps> = ({ token }) => {
  const [showDisclosure, setShowDisclosure] = useState(false);
  const [showGraph, setShowGraph] = useState(false);

  const minValue = Math.min(...token.sparkline_in_7d.price);
  const chartData = token.sparkline_in_7d.price.map((value) => ({
    name: "date",
    value: value - minValue,
  }));
  const graphColor =
    token.price_change_percentage_24h < 0 ? "#f9672d" : "#2eae34";

  const handleToggleShow = () => {
    if (showDisclosure) {
      setShowGraph((v) => !v);
      setShowDisclosure(!showDisclosure);
    } else {
      setShowDisclosure(!showDisclosure);
      setTimeout(() => {
        setShowGraph((v) => !v);
      }, 310);
    }
  };

  return (
    <>
      <div
        className={showDisclosure ? "card--open" : "card"}
        onClick={handleToggleShow}
      >
        <div className="card__content">
          <img className="card__icon" src={token.image} alt="icon" />
          <div className="card__section">
            <span className="card__section__product">{token.symbol} - USD</span>
            <span className="card__section__name">{token.name}</span>
          </div>
          <LineChart
            width={100}
            height={50}
            data={chartData}
            style={{ marginLeft: 30 }}
          >
            <Line
              type="monotone"
              dataKey="value"
              dot={false}
              stroke={graphColor}
            />
          </LineChart>
        </div>
        <div className="card__content--secondary">
          <div className="card__section--secondary">
            <span className="card__section__price">${token.current_price}</span>
            <span className="card__section__name">24h Volume</span>
          </div>
          <div className="card__section--secondary">
            <span className="card__section__price">${token.current_price}</span>
            <span
              className={"card__section__pricePercent"}
              style={{ color: graphColor }}
            >
              {token.price_change_percentage_24h}%
            </span>
          </div>
        </div>
      </div>
      <div className={showDisclosure ? "disclosure" : "disclosure--closed"}>
        {showGraph && (
          <ResponsiveContainer key={`chart_${showGraph ? "show" : "close"}`}>
            <LineChart height={300} data={chartData}>
              <Line
                type="monotone"
                dataKey="value"
                dot={false}
                stroke={graphColor}
              />
              <Tooltip
                content={({ active, payload, label }) => (
                  <CustomTooltip
                    active={active}
                    payload={payload}
                    minValue={minValue}
                    label={label}
                  />
                )}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </>
  );
};

export default TokenCard;
