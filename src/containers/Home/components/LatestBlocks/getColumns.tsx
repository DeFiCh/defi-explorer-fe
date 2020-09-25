import { I18n } from "react-redux-i18n";

const getColumns = () => {
  const column = [
    {
      id: "height",
      Header: I18n.t("containers.homePage.latestBlock.height"),
      accessor: "height",
    },
    {
      id: "time",
      Header: I18n.t("containers.homePage.latestBlock.time"),
      accessor: "time",
    },
    {
      id: "transactionCount",
      Header: I18n.t("containers.homePage.latestBlock.transactionCount"),
      accessor: "transactionCount",
    },
    {
      id: "size",
      Header: I18n.t("containers.homePage.latestBlock.size"),
      accessor: "size",
    },
  ];
  return column;
};

export default getColumns;
