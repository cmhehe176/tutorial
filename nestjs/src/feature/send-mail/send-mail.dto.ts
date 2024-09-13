export class sendMailDto {
  destination: {
    ToAddresses: string[];
    CcAddresses: string[];
    BccAddresses: string[];
  };

  title: string;

  data: string;
}
