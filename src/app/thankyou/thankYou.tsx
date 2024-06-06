"use client";
import { useQuery } from "@tanstack/react-query";
import { getOrderStatus } from "./actions";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import PhonePreview from "./phonePreview";
import { formatePrice } from "@/lib/utils";

const ThankYou = () => {
  const searhParams = useSearchParams();
  const orderId = searhParams.get("orderId") || "";
  const { data } = useQuery({
    queryKey: ["get-payment-status"],
    queryFn: async () => await getOrderStatus({ orderId }),
    retry: true,
    retryDelay: 500,
  });

  if (data === undefined) {
    return (
      <div className="mt-24 w-full flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
          <h3 className="font-semibold text-xl">Loading your order...</h3>
          <p>This {"won't"} take long</p>
        </div>
      </div>
    );
  }

  if (data === false) {
    return (
      <div className="mt-24 w-full flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
          <h3 className="font-semibold text-xl">Verifying your payment...</h3>
          <p>This might take a moment.</p>
        </div>
      </div>
    );
  }

  const { configuration, billingAddress, shippingAddress, amount } = data;
  const { color } = configuration;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-base font-medium text-primary">Thank you!</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Your case is on the way!
          </p>
          <p>{"We've"} received your order and are now processing it.</p>
          <div className="mt-12 text-sm font-medium">
            <p className="text-zinc-900">Order Number</p>
            <p className="mt-2 text-zinc-500">{orderId}</p>
          </div>
        </div>
        <div className="mt-10 border-t border-zinc-200">
          <div className="mt-2 flex flex-auto flex-col">
            <h4>You made a great choice</h4>
            <p className="mt-2 text-sm text-zinc-600">
              We at <span className="font-semibold">PhoneCase</span> believe
              that a phone case {"don't"} only need to look good, but also last
              you for the years to come. We offer a 5-years print guarantee: If
              your case {"is'nt"} of the highest quality, {"we'll"} replace it
              for free
            </p>
          </div>
        </div>
        <div className="flex space-x-6 overflow-hidden mt-4 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl">
          <PhonePreview
            croppedImageUrl={configuration.croppedImageUrl!}
            color={color!}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-6 py-10 text-sm">
          <div className="col-span-1">
            <p className="mt-2 text-zinc-900 font-medium">Shipping Address</p>
            <div className="mt-2 text-zinc-700">
              <address className="not-italic">
                <span className="block">{shippingAddress?.name}</span>
                <span className="block">{shippingAddress?.street}</span>
                <span className="block">
                  {shippingAddress?.city} {shippingAddress?.postalCode}
                </span>
                <span className="block">{shippingAddress?.phoneNumber}</span>
                <span className="block">{shippingAddress?.state}</span>
              </address>
            </div>
          </div>
          <div className="col-span-1">
            <p className="mt-2 text-zinc-900 font-medium">Billing Address</p>
            <div className="mt-2 text-zinc-700">
              <address className="not-italic">
                <span className="block">{billingAddress?.name}</span>
                <span className="block">{billingAddress?.street}</span>
                <span className="block">
                  {billingAddress?.city} {billingAddress?.postalCode}
                </span>
                <span className="block">{billingAddress?.phoneNumber}</span>
                <span className="block">{billingAddress?.state}</span>
              </address>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 py-10 text-sm border-t border-zinc-200">
          <div className="col-span-1">
            <p className="font-medium text-zinc-900">Payment Status</p>
            <p className="mt-2 text-zinc-900">Paid</p>
          </div>
          <div className="col-span-1">
            <p className="font-medium text-zinc-900">Shipping Method Status</p>
            <p className="mt-2 text-zinc-900">
              DHL, takes upto 3 working days.
            </p>
          </div>
        </div>
        <div className="space-y-6 border-t border-zinc-200 pt-10 text-sm">
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Subtotal</p>
            <p className="text-zinc-700">{formatePrice(amount)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Shipping</p>
            <p className="text-zinc-700">{formatePrice(0)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Total</p>
            <p className="text-zinc-700">{formatePrice(amount)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
