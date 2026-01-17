export type VaInquiryRequest = {
  partnerServiceId: string;
  customerNo: string;
  virtualAccountNo: string;
  inquiryRequestId: string;
};

export type VaInquiryResponse = {
  responseCode: string;
  responseMessage: string;
  virtualAccountData?: {
    partnerServiceId: string;
    customerNo: string;
    virtualAccountNo: string;
    virtualAccountName: string;
    virtualAccountEmail: string;
    virtualAccountPhone: string;
    inquiryRequestId: string;
  };
  totalAmount?: {
    value: string;
    currency: string;
  };
};

export type VaPaymentRequest = {
  partnerServiceId: string;
  customerNo: string;
  virtualAccountNo: string;
  paymentRequestId: string;
  paidAmount: {
    value: string;
    currency: string;
  };
  trxDateTime: string;
  referenceNo: string;
};

export type VaPaymentResponse = {
  responseCode: string;
  responseMessage: string;
  virtualAccountData?: {
    partnerServiceId: string;
    customerNo: string;
    virtualAccountNo: string;
    virtualAccountName: string;
    paymentRequestId: string;
    paidAmount: {
      value: string;
      currency: string;
    };
  };
};
